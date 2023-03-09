/**
 * Create by lwcai
 * Description: createCtxBody
 * Date: 2023-03-08
 */
export default function createCtxBody(result: boolean, message: string) {
  return {
    result,
    msg: message
  }
}
