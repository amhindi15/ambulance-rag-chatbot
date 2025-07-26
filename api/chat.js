
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter'
import { MemoryVectorStore } from 'langchain/vectorstores/memory'
import { OpenAIStream, StreamingTextResponse } from 'ai'
import { ChatOpenAI } from 'langchain/chat_models/openai'
import { ConversationalRetrievalQAChain } from 'langchain/chains'
import fs from 'fs/promises'
import path from 'path'
 import rawText from '@/knowledge/medical-protocol.txt?raw'

export const runtime = 'edge'

export async function POST(req) {
  const { messages } = await req.json()
  const question = messages[messages.length - 1].content

 


  const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000, chunkOverlap: 200 })
  const docs = await textSplitter.createDocuments([rawText])

  const vectorStore = await MemoryVectorStore.fromDocuments(
    docs,
    new OpenAIEmbeddings({ modelName: 'text-embedding-3-small' })
  )

  const model = new ChatOpenAI({
    temperature: 0,
    streaming: true,
    modelName: 'gpt-4o'
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

  const stream = await OpenAIStream(chain.stream({ question, chat_history: [] }))
  return new StreamingTextResponse(stream)
}
