import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter'
import { MemoryVectorStore } from 'langchain/vectorstores/memory'
import { ChatOpenAI } from 'langchain/chat_models/openai'
import { ConversationalRetrievalQAChain } from 'langchain/chains'
import { OpenAIStream, StreamingTextResponse } from 'ai'
import fs from 'fs/promises'
import path from 'path'

export const config = {
  runtime: 'edge',
}

export async function POST(req) {
  try {
    const { messages } = await req.json()
    const question = messages[messages.length - 1].content

    // قراءة الملف النصي من مجلد knowledge في جذر المشروع
    const filePath = path.join(process.cwd(), 'knowledge', 'medical-protocol.txt')
    const rawText = await fs.readFile(filePath, 'utf-8')

    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200
    })
    const docs = await textSplitter.createDocuments([rawText])

    const vectorStore = await MemoryVectorStore.fromDocuments(
      docs,
      new OpenAIEmbeddings({
        modelName: 'text-embedding-3-small',
        openAIApiKey: process.env.OPENAI_API_KEY
      })
    )

    const model = new ChatOpenAI({
      temperature: 0,
      streaming: true,
      modelName: 'gpt-4o',
      openAIApiKey: process.env.OPENAI_API_KEY
    })

    const chain = ConversationalRetrievalQAChain.fromLLM(
      model,
      vectorStore.asRetriever(),
      {
        returnSourceDocuments: false,
        questionGeneratorChainOptions: {
          template: `أجب باللغة العربية فقط وبناءً على المرجع الطبي التالي. لا تضف أي معلومات من خارج المرجع.
السؤال: {question}`,
        }
      }
    )

    const stream = await OpenAIStream(
      chain.stream({ question, chat_history: [] })
    )

    return new StreamingTextResponse(stream)

  } catch (error) {
    console.error("❌ API Error:", error)
    return new Response("Internal Server Error", { status: 500 })
  }
}
