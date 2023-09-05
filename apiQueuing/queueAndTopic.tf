resource "aws_sns_topic" "stackMessage_topic" {
  name = "stackMessage-topic"
}

resource "aws_sqs_queue" "messages_queue" {
  name = "messages-queue"
}

resource "aws_sns_topic_subscription" "stackMessage_topic_subscription" {
  topic_arn = aws_sns_topic.stackMessage_topic.arn
  protocol  = "sqs"
  endpoint  = aws_sqs_queue.messages_queue.arn
}

resource "aws_sqs_queue_policy" "sqs_queue_policy" {
  queue_url = aws_sqs_queue.messages_queue.id
  policy    = jsonencode({
    Version = "2012-10-17",
    Id      = "AllowSNSPublish",
    Statement = [
      {
        Sid       = "Allow-SNS-Publish",
        Effect    = "Allow",
        Principal = "*",
        Action    = "sqs:SendMessage",
        Resource  = aws_sqs_queue.messages_queue.arn,
        Condition = {
          ArnEquals = {
            "aws:SourceArn" = aws_sns_topic.stackMessage_topic.arn
          }
        }
      }
    ]
  })
}
