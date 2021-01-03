const { ApolloServer } = require("apollo-server-koa")
const { graphqlUploadKoa } = require("graphql-upload")
const Koa = require("koa")
const shortid = require("shortid")
const serve = require("koa-static")

const fs = require("fs")
const path = require("path")

const schema = require("./schema/main")

// Expected here; serve static files from public dir
const staticDirPath = path.join(__dirname, "uploads")

const storeUpload = async (upload) => {
  const { createReadStream, filename, mimetype } = await upload
  const stream = createReadStream()
  const id = shortid.generate()
  const ext = mimetype.split("/")[1]
  const name = `${id}.${ext}`
  console.log(name)
  const path = `uploads/${name}`
  const file = { id, filename, mimetype, path }

  // Store the file in the filesystem.
  await new Promise((resolve, reject) => {
    // Create a stream to which the upload will be written.
    const writeStream = fs.createWriteStream(path)

    // When the upload is fully written, resolve the promise.
    writeStream.on("finish", resolve)

    // If there's an error writing the file, remove the partially written file
    // and reject the promise.
    writeStream.on("error", (error) => {
      unlink(path, () => {
        reject(error)
      })
    })

    // In Node.js <= v13, errors are not automatically propagated between piped
    // streams. If there is an error receiving the upload, destroy the write
    // stream with the corresponding error.
    stream.on("error", (error) => writeStream.destroy(error))

    // Pipe the upload into the write stream.
    stream.pipe(writeStream)
  })

  return name
}

const app = new Koa().use(
  graphqlUploadKoa({
    maxFileSize: 1000000, // 1MB
    maxFiles: 20,
  })
)

app.use(serve(staticDirPath))
new ApolloServer({
  uploads: false,
  schema,
  context: { storeUpload },
}).applyMiddleware({ app })

app.listen(4000, (error) => {
  if (error) throw error

  console.info(`Serving http://localhost:4000.`)
})
