'use strict'
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value)
          })
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const supertest_1 = __importDefault(require('supertest'))
const index_1 = __importDefault(require('../index'))
const fs_1 = __importDefault(require('fs'))
const imageProcessing_1 = require('../imageProcessing')
describe('GET /api/images', () => {
  it('return 400 if missing parameter in url', () =>
    __awaiter(void 0, void 0, void 0, function* () {
      const res = yield (0, supertest_1.default)(index_1.default).get(
        '/api/images',
      )
      expect(res.status).toBe(400)
    }))
  it('return 500 if has error', () =>
    __awaiter(void 0, void 0, void 0, function* () {
      const res = yield (0, supertest_1.default)(index_1.default).get(
        '/api/images?filename=testing.jpg&width=200&height=200',
      )
      expect(res.status).toBe(500)
    }))
  it('return 200 and show processed image if success', () =>
    __awaiter(void 0, void 0, void 0, function* () {
      const res = yield (0, supertest_1.default)(index_1.default).get(
        '/api/images?filename=Bucket_01.jpg&width=200&height=200',
      )
      expect(res.status).toBe(200)
      expect(res.headers['content-type']).toMatch(/image\/jpeg/)
    }))
})
describe('Image Process', () => {
  const filename = 'Bucket_01.jpg'
  const width = 200
  const height = 200
  const output = `./thumbnail/${filename}-${width}x${height}.jpg`
  afterEach(() => {
    if (fs_1.default.existsSync(output)) {
      fs_1.default.unlinkSync(output)
    }
  })
  it('create resized image', () =>
    __awaiter(void 0, void 0, void 0, function* () {
      if (fs_1.default.existsSync(output)) {
        fs_1.default.unlinkSync(output)
      }
      yield (0, imageProcessing_1.process)(filename, width, height)
      expect(fs_1.default.existsSync(output)).toBe(true)
    }))
})
