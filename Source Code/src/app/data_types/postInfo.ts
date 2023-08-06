export class PostInfo {
    title: string | undefined
    body: string | undefined

    constructor(title: string | undefined, body: string | undefined) {
        this.title = title
        this.body = body
    }
}