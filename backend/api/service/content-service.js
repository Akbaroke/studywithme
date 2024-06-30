"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentService = void 0;
const database_1 = require("../application/database");
const validation_1 = require("../validation/validation");
const content_validation_1 = require("../validation/content-validation");
class ContentService {
    static create(contentData, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const validatedData = validation_1.Validation.validate(content_validation_1.ContentValidation.CREATE, contentData);
            // Extract categories from validatedData
            const { categories } = validatedData, dataWithoutCategories = __rest(validatedData, ["categories"]);
            // Create content without categories
            const createdContent = yield database_1.prismaClient.content.create({
                data: Object.assign(Object.assign({}, dataWithoutCategories), { created_by: userId, updated_by: userId, 
                    // Connect categories
                    categories: {
                        create: categories.map((categoryId) => ({
                            category: { connect: { id: categoryId } },
                        })),
                    } }),
            });
            return createdContent;
        });
    }
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const contents = yield database_1.prismaClient.content.findMany({
                orderBy: {
                    updated_at: 'desc',
                },
                include: {
                    detailContentContentId: true,
                    categories: {
                        include: {
                            category: true,
                        },
                    },
                    createdBy: {
                        select: {
                            name: true,
                        },
                    },
                    updatedBy: {
                        select: {
                            name: true,
                        },
                    },
                },
            });
            return contents.map((content) => {
                let total_duration = 0;
                content.detailContentContentId.forEach((detail) => {
                    var _a;
                    total_duration += (_a = detail.duration) !== null && _a !== void 0 ? _a : 0;
                });
                return {
                    id: content.id,
                    title: content.title,
                    description: content.description,
                    thumbnail: content.thumbnail,
                    is_premium: content.is_premium,
                    total_duration,
                    total_klik: content.total_klik,
                    created_by: content.createdBy.name,
                    updated_by: content.updatedBy.name,
                    created_at: content.created_at,
                    updated_at: content.updated_at,
                    total_content: content.detailContentContentId.length,
                    categories: content.categories.map(({ category }) => ({
                        id: category.id,
                        name: category.name,
                        created_by: category.created_by,
                        updated_by: category.updated_by,
                        created_at: category.created_at,
                        updated_at: category.updated_at,
                    })),
                };
            });
        });
    }
    static getFreeContent() {
        return __awaiter(this, void 0, void 0, function* () {
            const contents = yield database_1.prismaClient.content.findMany({
                where: {
                    is_premium: false,
                },
                orderBy: {
                    created_at: 'asc',
                },
                include: {
                    detailContentContentId: true,
                    categories: {
                        include: {
                            category: true,
                        },
                    },
                    createdBy: {
                        select: {
                            name: true,
                        },
                    },
                    updatedBy: {
                        select: {
                            name: true,
                        },
                    },
                },
            });
            return contents.map((content) => {
                let total_duration = 0;
                content.detailContentContentId.forEach((detail) => {
                    var _a;
                    total_duration += (_a = detail.duration) !== null && _a !== void 0 ? _a : 0;
                });
                return {
                    id: content.id,
                    title: content.title,
                    description: content.description,
                    thumbnail: content.thumbnail,
                    is_premium: content.is_premium,
                    total_duration,
                    total_klik: content.total_klik,
                    created_by: content.createdBy.name,
                    updated_by: content.updatedBy.name,
                    created_at: content.created_at,
                    updated_at: content.updated_at,
                    total_content: content.detailContentContentId.length,
                    categories: content.categories.map(({ category }) => ({
                        id: category.id,
                        name: category.name,
                        created_by: category.created_by,
                        updated_by: category.updated_by,
                        created_at: category.created_at,
                        updated_at: category.updated_at,
                    })),
                };
            });
        });
    }
    static getMostClickedContent() {
        return __awaiter(this, void 0, void 0, function* () {
            const contents = yield database_1.prismaClient.content.findMany({
                orderBy: {
                    total_klik: 'desc',
                },
                include: {
                    detailContentContentId: true,
                    categories: {
                        include: {
                            category: true,
                        },
                    },
                    createdBy: {
                        select: {
                            name: true,
                        },
                    },
                    updatedBy: {
                        select: {
                            name: true,
                        },
                    },
                },
            });
            return contents.map((content) => {
                let total_duration = 0;
                content.detailContentContentId.forEach((detail) => {
                    var _a;
                    total_duration += (_a = detail.duration) !== null && _a !== void 0 ? _a : 0;
                });
                return {
                    id: content.id,
                    title: content.title,
                    description: content.description,
                    thumbnail: content.thumbnail,
                    is_premium: content.is_premium,
                    total_duration,
                    total_klik: content.total_klik,
                    created_by: content.createdBy.name,
                    updated_by: content.updatedBy.name,
                    created_at: content.created_at,
                    updated_at: content.updated_at,
                    total_content: content.detailContentContentId.length,
                    detail_content: content.detailContentContentId,
                    categories: content.categories.map(({ category }) => ({
                        id: category.id,
                        name: category.name,
                        created_by: category.created_by,
                        updated_by: category.updated_by,
                        created_at: category.created_at,
                        updated_at: category.updated_at,
                    })),
                };
            });
        });
    }
    static getById(contentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const content = yield database_1.prismaClient.content.findUnique({
                where: {
                    id: contentId,
                },
                include: {
                    detailContentContentId: {
                        orderBy: {
                            serial_number: 'asc',
                        },
                    },
                    categories: {
                        include: {
                            category: true,
                        },
                    },
                    createdBy: {
                        select: {
                            name: true,
                        },
                    },
                    updatedBy: {
                        select: {
                            name: true,
                        },
                    },
                },
            });
            if (!content) {
                throw new Error(`Content with id ${contentId} not found.`);
            }
            let total_duration = 0;
            content.detailContentContentId.forEach((detail) => {
                var _a;
                total_duration += (_a = detail.duration) !== null && _a !== void 0 ? _a : 0;
            });
            return {
                id: content.id,
                title: content.title,
                description: content.description,
                thumbnail: content.thumbnail,
                is_premium: content.is_premium,
                total_duration,
                total_klik: content.total_klik,
                created_by: content.createdBy.name,
                updated_by: content.updatedBy.name,
                created_at: content.created_at,
                updated_at: content.updated_at,
                total_content: content.detailContentContentId.length,
                detail_content: content.detailContentContentId,
                categories: content.categories.map(({ category }) => ({
                    id: category.id,
                    name: category.name,
                    created_by: category.created_by,
                    updated_by: category.updated_by,
                    created_at: category.created_at,
                    updated_at: category.updated_at,
                })),
            };
        });
    }
    static clickedContent(contentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentContent = yield database_1.prismaClient.content.findUnique({
                where: {
                    id: contentId,
                },
            });
            if (!currentContent) {
                throw new Error('Konten tidak ditemukan');
            }
            const previousTotalKlik = currentContent.total_klik
                ? currentContent.total_klik
                : 0;
            // Perbarui total_klik
            const updatedContent = yield database_1.prismaClient.content.update({
                where: {
                    id: contentId,
                },
                data: {
                    total_klik: previousTotalKlik + 1,
                },
            });
            return updatedContent;
        });
    }
    static update(contentId, contentData, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const validatedData = validation_1.Validation.validate(content_validation_1.ContentValidation.UPDATE, contentData);
            // Extract categories and other data
            const { categories } = validatedData, dataWithoutCategories = __rest(validatedData, ["categories"]);
            // Prepare set object for updating content
            const setContent = Object.assign(Object.assign({}, dataWithoutCategories), { updated_by: userId });
            if (categories) {
                // Delete all existing categories for this content
                yield database_1.prismaClient.contentCategory.deleteMany({
                    where: {
                        id_content: contentId,
                    },
                });
                // Add new categories to the content
                const categoryIds = categories === null || categories === void 0 ? void 0 : categories.map((categoryId) => ({
                    id_category: categoryId,
                    id_content: contentId,
                }));
                // Create new content categories
                yield database_1.prismaClient.contentCategory.createMany({
                    data: categoryIds,
                });
            }
            // Create new content data
            const updatedContent = yield database_1.prismaClient.content.update({
                where: {
                    id: contentId,
                },
                data: Object.assign({}, setContent),
            });
            return updatedContent;
        });
    }
    static delete(contentId) {
        return __awaiter(this, void 0, void 0, function* () {
            // Check if the content exists
            const existingContent = yield database_1.prismaClient.content.findUnique({
                where: {
                    id: contentId,
                },
            });
            if (!existingContent) {
                throw new Error(`Content with id ${contentId} not found.`);
            }
            yield database_1.prismaClient.content.delete({
                where: {
                    id: contentId,
                },
            });
        });
    }
}
exports.ContentService = ContentService;
