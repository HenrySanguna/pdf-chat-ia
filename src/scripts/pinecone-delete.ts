import { getChunkedDocsFromPDF } from "@/lib/pdf-loader";
import { deleteVectorsPin, embedAndStoreDocs } from "@/lib/vector-store";
import { getPineconeClient } from "@/lib/pinecone-client";

// This operation might fail because indexes likely need
// more time to init, so give some 5 mins after index
// creation and try again.
(async () => {
  try {
    const pineconeClient = await getPineconeClient();
    const docs = await deleteVectorsPin(pineconeClient);
    console.log("BORRADO");
  } catch (error) {
    console.error("Init client script failed ", error);
  }
})();