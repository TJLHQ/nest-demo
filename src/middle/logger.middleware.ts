export function Logger(req: Request, res: Response, next: () => void) {
  console.log(req.method+'........'+req.url)
  next()
}
