const paragraphBreaks = / (?=You can go get AI|Dayne will stay with you|The graphics, layout|Dayne took our vision)/

export default function ReviewQuote({ body }: { body: string }) {
  return (
    <blockquote className="review-body">
      {body.split(paragraphBreaks).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
    </blockquote>
  )
}
