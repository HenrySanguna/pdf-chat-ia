import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter, CharacterTextSplitter } from "langchain/text_splitter";
import { env } from "./config";

export async function getChunkedDocsFromPDF() {
  try {
    // const directoryLoader = new DirectoryLoader(
    //   "../../docs/",
    //   {
    //     ".pdf": (path: string) => new PDFLoader(path),
    //   }
    // );

    const loader = new PDFLoader(env.PDF_PATH);
    const docs = await loader.load();

    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
      keepSeparator: true
    });

    const chunkedDocs = await textSplitter.splitDocuments(docs);

    return chunkedDocs;
  } catch (e) {
    console.error(e);
    throw new Error("PDF docs chunking failed !");
  }
}

export enum DATA_PDFS {
  "EL PRODUCT OWNER"
}
