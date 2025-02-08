let pipeline: any = null

export async function generateLocalEmbedding(content: string) {
  try {
    if (!pipeline) {
      const { pipeline: transformersPipeline } = await import(
        "@xenova/transformers"
      )
      pipeline = transformersPipeline
    }

    const generateEmbedding = await pipeline(
      "feature-extraction",
      "Xenova/all-MiniLM-L6-v2"
    )

    const output = await generateEmbedding(content, {
      pooling: "mean",
      normalize: true
    })

    return Array.from(output.data)
  } catch (error) {
    console.error("Error generating local embedding:", error)
    throw new Error("Failed to generate embedding")
  }
}
