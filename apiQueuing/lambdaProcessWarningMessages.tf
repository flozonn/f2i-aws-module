
resource "aws_lambda_function" "process_warning_messages" {
  filename         = "${path.module}/lambda_code/process_warning_messages.js.zip"
  function_name    = "process_warning_messages"
  role             = "${aws_iam_role.sqs_lambda.arn}"
  handler          = "process_warning_messages.handler"
  runtime          = "nodejs14.x"
  source_code_hash = "${filebase64sha256("${path.module}/lambda_code/process_warning_messages.js.zip")}"
    environment {
        variables = {
        SNS_TOPIC_ARN = aws_sns_topic.stackMessage_topic.arn
        }
  }
}

resource "aws_lambda_permission" "sqs_lambdaWarning_permission" {
  statement_id  = "AllowExecutionFromSQS"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.process_warning_messages.function_name
  principal     = "sqs.amazonaws.com"
  source_arn = aws_sqs_queue.messages_warning_queue.arn
}

resource "aws_lambda_event_source_mapping" "warnings_event_source_mapping" {
  batch_size        = 1
  event_source_arn  = "${aws_sqs_queue.messages_warning_queue.arn}"
  enabled           = true
  function_name     = "${aws_lambda_function.process_warning_messages.arn}"
  depends_on = [
    aws_lambda_function.process_warning_messages
  ]
}

