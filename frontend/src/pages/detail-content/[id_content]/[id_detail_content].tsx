import FormQuiz, { AnswerType } from '@/components/molecules/FormQuiz';
import VideoPlayer from '@/components/molecules/VideoPlayer';
import cn from '@/helpers/cn';
import { formatSeconds } from '@/helpers/formatDate';
import urlify from '@/helpers/urlify';
import {
  ContentModel,
  DetailContentModel,
  SendDiscussionModel,
} from '@/models/contentModel';
import { getContentById } from '@/services/contentService';
import { getDetailContentById } from '@/services/detailContentService';
import getSession from '@/services/getSession';
import { ActionIcon, Button, ScrollArea, Transition } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconPlayerTrackNext, IconPlayerTrackPrev } from '@tabler/icons-react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { NextRequest } from 'next/server';
import { useEffect, useState } from 'react';
import { GiTrophy } from 'react-icons/gi';
import { FaStar } from 'react-icons/fa';
import ProgressRing from '@/components/atoms/ProgressRing';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createHistoryQuestion,
  updateHistoryQuestion,
} from '@/services/historyQuestionService';
import { HistoryQuestionModel } from '@/models/questionModel';
import Notify from '@/components/atoms/Notify';
import { UserModel } from '@/models/userModel';
import { useSession } from 'next-auth/react';
import { MdOutlinePlaylistPlay } from 'react-icons/md';
import MenuDrawer from '@/components/atoms/MenuDrawer';
import DiscussionItem from '@/components/molecules/DiscussionItem';
import InputDiscussion from '@/components/atoms/InputDiscussion';
import { createDiscussion } from '@/services/discussionService';
import Metadata from '@/components/atoms/Metadata';

type Props = {
  content: ContentModel | null;
  detailContentSSR: DetailContentModel | null;
  id_content: string;
  id_detail_content: string;
};

type QuestionStatus = 'unanswered' | 'pending' | 'answered';

export default function DetailContent({
  content,
  detailContentSSR,
  id_content,
  id_detail_content,
}: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const session: UserModel = useSession().data?.user as UserModel;
  const isNotMobile = useMediaQuery('(min-width: 768px)');
  const historyQuestion = detailContentSSR?.historyQuestion;
  const [answers, setAnswers] = useState<AnswerType[]>([]);
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState<number>(1);
  const [questionStatus, setQuestionStatus] =
    useState<QuestionStatus>('unanswered');
  const [questionFinalScore, setQuestionFinalScore] = useState({
    result_score: 0,
    target_score: 0,
  });
  const [progressValue, setProgressValue] = useState<number>(0);
  const [progressDuration, setProgressDuration] = useState<number>(0);
  const [isOpenListMateriDrawer, setIsOpenListMateriDrawer] = useState(false);
  const [isOpenCommentMobileDrawer, setIsOpenCommentMobileDrawer] =
    useState(false);
  const [detailContent, setDetailContent] = useState<DetailContentModel | null>(
    null
  );
  const [newComment, setNewComment] = useState('');
  const [replyComment, setReplyComment] = useState('');
  const [replyCommentId, setReplyCommentId] = useState('');
  const newDetailContent = useQuery<DetailContentModel>({
    queryKey: [`contents/${id_content}/${id_detail_content}`],
    queryFn: () =>
      getDetailContentById(id_detail_content, session.token as string),
  });

  useEffect(() => {
    setDetailContent(detailContentSSR);

    if (newDetailContent.data) {
      setDetailContent(newDetailContent.data);
    }

    return () => setDetailContent(null);
  }, [detailContentSSR, newDetailContent.data, id_detail_content]);

  useEffect(() => {
    console.log(historyQuestion);
    if (historyQuestion) {
      setQuestionStatus('answered');
      setQuestionFinalScore({
        result_score: historyQuestion.result_score,
        target_score: historyQuestion.target_score,
      });
    } else {
      setQuestionStatus('unanswered');
      setQuestionFinalScore({
        result_score: 0,
        target_score: 0,
      });
    }
  }, [historyQuestion]);

  const saveAnswer = (answers: AnswerType[]) => {
    setQuestionStatus('pending');
    setProgressDuration(8000);
    const result_score = answers.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.score;
    }, 0);
    const target_score = detailContent?.questions.reduce(
      (accumulator, currentValue) => {
        return accumulator + currentValue.score;
      },
      0
    );
    setQuestionFinalScore({
      result_score: result_score,
      target_score: target_score ?? 0,
    });
  };

  const mutation = useMutation({
    mutationFn: async ({
      newHistoryQuestion,
      token,
    }: {
      newHistoryQuestion: Partial<HistoryQuestionModel | any>;
      token: string;
    }) => {
      const response = historyQuestion?.id
        ? await updateHistoryQuestion(
            historyQuestion?.id,
            newHistoryQuestion,
            token
          )
        : await createHistoryQuestion(newHistoryQuestion, token);
      return response;
    },
    onMutate: () => {
      Notify('loading', 'Menyimpan nilai..', 'action-content');
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['contents/' + id_content] });
      Notify('success', response, 'action-content');
    },
    onError: (error: any) => {
      Notify('error', 'Gagal memproses konten', 'action-content');
      console.error('Error creating content:', error);
    },
  });

  const mutationDiscussion = useMutation({
    mutationFn: async ({
      newComment,
      token,
    }: {
      newComment: Partial<SendDiscussionModel | any>;
      token: string;
    }) => {
      const response = await createDiscussion(newComment, token);
      return response;
    },
    onMutate: () => {
      Notify('loading', 'Mengirimkan komentar..', 'action-dicusion');
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: [`contents/${id_content}/${id_detail_content}`],
      });
      Notify('success', response, 'action-dicusion');
      if (replyComment) {
        setReplyComment('');
        setReplyCommentId('');
      } else {
        setNewComment('');
      }
      if (!isNotMobile) {
        setIsOpenCommentMobileDrawer(false);
      }
    },
    onError: (error: any) => {
      Notify('error', 'Gagal menambahkan komentar', 'action-dicusion');
      console.error('Error creating content:', error);
    },
  });

  const saveScore = async () => {
    if (session.token) {
      mutation.mutate({
        newHistoryQuestion: {
          id_detail_content: id_detail_content,
          result_score: questionFinalScore.result_score,
          target_score: questionFinalScore.target_score,
        },
        token: session.token,
      });
    } else {
      console.error('User is not authenticated');
    }
  };

  const sendComment = async () => {
    if (session.token) {
      mutationDiscussion.mutate({
        newComment: replyComment
          ? {
              message: replyComment,
              id_detail_content: id_detail_content,
              id_replies_discussion: replyCommentId,
            }
          : {
              message: newComment,
              id_detail_content: id_detail_content,
            },
        token: session.token,
      });
    } else {
      console.error('User is not authenticated');
    }
  };

  const tryAgainQuiz = () => {
    setAnswers([]);
    setQuestionStatus('unanswered');
    setCurrentQuestionNumber(1);
    setProgressValue(0);
    setProgressDuration(0);
    setQuestionFinalScore({
      result_score: 0,
      target_score: 0,
    });
  };

  const PagingVideo = () => (
    <>
      <ActionIcon
        variant="filled"
        disabled={detailContent?.serial_number === 1}
        onClick={() =>
          router.push(
            `/detail-content/${id_content}/${
              content?.detail_content[(detailContent?.serial_number ?? 0) - 2]
                .id
            }`
          )
        }
        color="#000"
        aria-label="prev"
        radius="md"
        size={isNotMobile ? 35 : 32}>
        <IconPlayerTrackPrev
          style={{ width: '55%', height: '55%' }}
          stroke={1.5}
        />
      </ActionIcon>
      <ActionIcon
        variant="filled"
        disabled={detailContent?.serial_number === content?.total_content}
        onClick={() =>
          router.push(
            `/detail-content/${id_content}/${
              content?.detail_content[detailContent?.serial_number ?? 0].id
            }`
          )
        }
        color="#000"
        aria-label="next"
        radius="md"
        size={isNotMobile ? 35 : 32}>
        <IconPlayerTrackNext
          style={{ width: '55%', height: '55%' }}
          stroke={1.5}
        />
      </ActionIcon>
    </>
  );

  const ListDetailContents = () => (
    <div className="flex flex-col gap-1">
      {content?.detail_content?.map((materi) => (
        <Link
          href={`/detail-content/${id_content}/${materi.id}`}
          onClick={() => setIsOpenListMateriDrawer(false)}
          key={materi.id}
          className={cn(
            'flex items-center justify-between text-xs text-gray-600 [&_svg]:text-gray-400 p-2 rounded-lg hover:bg-black hover:text-white hover:shadow-lg transition-all duration-300',
            materi.id === id_detail_content && 'bg-black text-white shadow-lg'
          )}>
          <div className="flex items-center gap-2 flex-1">
            <p>{materi.serial_number}</p>
            <p className="line-clamp-2">{materi.title}</p>
          </div>
          <div className="flex items-center gap-2">
            {materi.video_url && <p>{formatSeconds(materi.duration)}</p>}
            {/* {materi.is_premium ? (
              <IconLock size={16} />
            ) : (
              <IconLockOpen2 size={16} />
            )} */}
          </div>
        </Link>
      ))}
    </div>
  );

  return (
    <div className="flex items-start gap-5 py-10">
      <Metadata title="Detail Materi" />
      <MenuDrawer
        title="List Materi"
        size="xs"
        isOpen={isOpenListMateriDrawer}
        onClose={() => setIsOpenListMateriDrawer(false)}>
        <ListDetailContents />
      </MenuDrawer>
      <MenuDrawer
        title=""
        position="bottom"
        size="xs"
        isOpen={isOpenCommentMobileDrawer}
        withCloseButton={true}
        onClose={() => setIsOpenCommentMobileDrawer(false)}>
        <div className="px-3">
          <InputDiscussion
            isLoading={mutationDiscussion.isPending}
            sendComment={sendComment}
            minRows={6}
            maxRows={6}
            user={session}
            onChange={setNewComment}
            value={newComment}
          />
        </div>
      </MenuDrawer>
      <div className="md:w-[200px] lg:w-[300px] md:flex flex-col gap-5 border rounded-lg p-3 hidden md:sticky md:top-28 bg-white">
        <Link
          href={`/detail-content/${id_content}`}
          className="flex flex-col gap-0 p-3 border-b cursor-pointer hover:bg-gray-100 transition-all duration-300">
          <h1 className="text-md font-semibold">{content?.title}</h1>
          <p className="text-xs">{content?.total_content} meteri</p>
        </Link>
        <ScrollArea.Autosize mah={350} type="scroll">
          <ListDetailContents />
        </ScrollArea.Autosize>
      </div>
      <div className="flex-1 relative flex flex-col gap-5">
        {detailContent?.video_url && (
          <VideoPlayer
            id={id_detail_content}
            url={detailContent?.video_url}
            duration={detailContent?.duration}
            thumbnail={content?.thumbnail}
          />
        )}
        <div className="flex items-center justify-between md:hidden">
          <Button
            radius="md"
            variant="filled"
            color="#000"
            onClick={() => setIsOpenListMateriDrawer(true)}
            leftSection={<MdOutlinePlaylistPlay size={16} />}
            size="xs"
            loading={mutation.status === 'pending'}>
            Buka List Materi
          </Button>
          <div className="flex items-center gap-2">
            <PagingVideo />
          </div>
        </div>
        <div className="w-full border rounded-lg bg-white">
          <div className="p-6 flex flex-col gap-1 md:gap-5">
            <div className="flex items-center justify-between">
              <h1 className="text-lg md:text-2xl font-bold">
                {detailContent?.title}
              </h1>
              <div className="md:flex items-center gap-2 hidden">
                <PagingVideo />
              </div>
            </div>
            <p className="text-sm md:text-lg font-medium break-words whitespace-pre-line leading-5">
              {urlify(detailContent?.description)}
            </p>
          </div>
          {!(
            questionStatus === 'unanswered' && detailContent?.questions?.length
          ) && (
            <div className="p-6 flex flex-col gap-5 border-t">
              <div className="flex flex-col gap-1">
                <h2 className="font-bold text-md md:text-xl">Komentar</h2>
                <p className="text-sm text-gray-600">
                  {detailContent?.discussions?.length === 0
                    ? 'Jadi yang pertama untuk berkomentar'
                    : `Ada ${detailContent?.discussions?.length} komentar pada materi ini.`}
                </p>
              </div>
              {isNotMobile ? (
                <InputDiscussion
                  isLoading={mutationDiscussion.isPending}
                  sendComment={sendComment}
                  user={session}
                  onChange={setNewComment}
                  value={newComment}
                />
              ) : (
                <div
                  className="grid place-items-center p-3 border-dashed border rounded-lg cursor-pointer text-gray-600 hover:text-black hover:font-medium transition-all duration-300"
                  onClick={() => setIsOpenCommentMobileDrawer(true)}>
                  Tambahkan komentar
                </div>
              )}
              <div className="pb-4 flex flex-col gap-6">
                {detailContent?.discussions?.map((discussion) => (
                  <div key={discussion.id}>
                    <DiscussionItem
                      discussion={discussion}
                      onOpenReply={() => {
                        replyCommentId === discussion.id
                          ? setReplyCommentId('')
                          : setReplyCommentId(discussion.id);

                        replyCommentId !== discussion.id && setReplyComment('');
                      }}
                    />
                    <Transition
                      mounted={discussion.id === replyCommentId}
                      transition="pop-top-left"
                      duration={400}
                      timingFunction="ease">
                      {(styles) => (
                        <div style={styles} className="pl-16 mt-2">
                          <InputDiscussion
                            hiddenUserInfo={true}
                            isLoading={mutationDiscussion.isPending}
                            sendComment={sendComment}
                            user={session}
                            onChange={setReplyComment}
                            value={replyComment}
                          />
                        </div>
                      )}
                    </Transition>
                    {discussion.replies.length > 0 && (
                      <div className="flex flex-col gap-8 pl-12 mt-6">
                        {discussion.replies.map((reply) => (
                          <DiscussionItem
                            key={reply.id}
                            discussion={reply}
                            isDisableReply={true}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {detailContent?.questions?.length ? (
          <div className="w-full border rounded-lg p-5 bg-white">
            {questionStatus === 'unanswered' &&
              detailContent?.questions[currentQuestionNumber - 1] && (
                <FormQuiz
                  currentQuestionNumber={currentQuestionNumber}
                  setCurrentQuestionNumber={setCurrentQuestionNumber}
                  question={
                    detailContent?.questions[currentQuestionNumber - 1] as any
                  }
                  totalQuestion={detailContent?.questions?.length}
                  answers={answers}
                  setAnswers={setAnswers}
                  saveAnswer={saveAnswer}
                />
              )}
            {questionStatus === 'answered' && (
              <div className="flex flex-col gap-5 items-center justify-between py-5">
                <h1 className="font-semibold text-xl">Selamat!</h1>
                <div className="relative w-max h-max">
                  <GiTrophy size={100} className="text-yellow-300" />
                  <FaStar
                    size={30}
                    className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white"
                  />
                </div>
                <div className="flex flex-col gap-2 items-center">
                  <p className="text-sm">Kamu mendapat Nilai</p>
                  <div className="flex items-end">
                    <p className="text-2xl font-bold">
                      {questionFinalScore.result_score}
                    </p>
                    <p className="font-medium">/{100}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <Button
                    radius="md"
                    variant="outline"
                    color="#000"
                    onClick={tryAgainQuiz}
                    size="xs"
                    loading={mutation.status === 'pending'}>
                    Ulangi
                  </Button>
                  <Button
                    radius="md"
                    variant="filled"
                    color="#000"
                    onClick={saveScore}
                    size="xs"
                    loading={mutation.status === 'pending'}>
                    Simpan Nilai
                  </Button>
                </div>
              </div>
            )}
            {questionStatus === 'pending' && (
              <div className="flex flex-col gap-2 items-center justify-center py-20">
                <ProgressRing
                  duration={progressDuration}
                  onProgressChange={setProgressValue}
                />
                <div className="flex flex-col gap-1 text-center">
                  <p className="font-medium text-sm">
                    {progressValue === 100 ? 'Selesai' : 'Mohon tunggu,'}
                  </p>
                  {progressValue === 100 ? (
                    <Button
                      radius="md"
                      variant="outline"
                      color="#000"
                      onClick={() => setQuestionStatus('answered')}
                      size="xs"
                      disabled={progressValue < 100}
                      styles={{
                        root: {
                          margin: '14px 30px',
                        },
                      }}>
                      Lihat hasil
                    </Button>
                  ) : (
                    <p className="font-medium text-xs text-gray-400">
                      Jawaban kamu sedang kami periksa...
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id_content, id_detail_content } = ctx.query;
  const sessionData = await getSession(ctx.req as unknown as NextRequest);

  if (!id_content || typeof id_content !== 'string') {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  if (!id_detail_content || typeof id_detail_content !== 'string') {
    return {
      redirect: {
        destination: '/detail-content/' + id_content,
        permanent: false,
      },
    };
  }

  try {
    const content = await getContentById(id_content, sessionData.token!);
    const detailContent = await getDetailContentById(
      id_detail_content,
      sessionData.token as string
    );

    return {
      props: {
        content,
        detailContentSSR: detailContent,
        id_content,
        id_detail_content,
      },
    };
  } catch (error) {
    console.error('Error fetching content:', error);
    return {
      notFound: true,
    };
  }
};
