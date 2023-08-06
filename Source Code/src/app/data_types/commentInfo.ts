export class CommentInfo {
    body: string | undefined
    layer: number | undefined

    constructor(body: string | undefined, layer: number | undefined) {
        this.body = body
        this.layer = layer
    }
}