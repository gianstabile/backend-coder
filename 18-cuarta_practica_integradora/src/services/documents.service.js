import documentsModel from "../dao/models/documents.model.js";

const documentService = {
  createDocument: async (documentData) => {
    const document = new documentsModel(documentData);
    await document.save();
    return document;
  },

  findDocsById: (filter) => {
    return documentsModel.find(filter).lean();
  },

  deleteDocumentById: async (documentId) => {
    try {
      await documentsModel.findByIdAndRemove(documentId);
    } catch (error) {
      throw new Error("Failed to delete the document.");
    }
  },
};

export default documentService;
