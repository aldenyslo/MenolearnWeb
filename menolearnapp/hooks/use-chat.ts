import { Source } from "@prisma/client"
import { create } from "zustand"

interface ResponsesStore {
  responses: { message: string; source: Source }[]
  addResponse: (response: {
    message: string
    source: Source
  }) => void
  addResponses: (
    response?: {
      message: string
      source: Source
    }[]
  ) => void
  clearResponses: () => void
}

const useChatStore = create<ResponsesStore>((set) => ({
  responses: [],
  addResponse: (response: {
    message: string
    source: Source
  }) =>
    set((state) => ({
      responses: [...state.responses, response],
    })),
  addResponses: (
    responses?: {
      message: string
      source: Source
    }[]
  ) =>
    set((state) => {
      if (responses != null) {
        return {
          responses: [
            ...state.responses,
            ...responses,
          ],
        }
      } else {
        return { responses: state.responses }
      }
    }),
  clearResponses: () => set({ responses: [] }),
}))

export default useChatStore
