
resource "aws_lambda_function" "put_in_queue" {
  filename         = "${path.module}/lambda_code/put_in_queue.js.zip"
  function_name    = "put_in_queue"
  role             = "${aws_iam_role.role.arn}"
  handler          = "put_in_queue.handler"
  runtime          = "nodejs14.x"
  source_code_hash = "${filebase64sha256("${path.module}/lambda_code/put_in_queue.js.zip")}"
    environment {
        variables = {
        SNS_TOPIC_ARN = aws_sns_topic.stackMessage_topic.arn
        }
  }
}

