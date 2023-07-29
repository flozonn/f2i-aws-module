resource "aws_lambda_event_source_mapping" "lambda_dynamodb_trigger" {
  event_source_arn = aws_dynamodb_table.job_table.stream_arn
  function_name    = aws_lambda_function.write_to_dynamo.function_name
  starting_position = "LATEST"
  batch_size = 1
}

resource "aws_lambda_function" "write_to_dynamo" {
  filename         = "${path.module}/lambda_code/write_to_dynamo.js.zip"
  function_name    = "write_to_dynamo"
  role             = "${aws_iam_role.write_to_dynamo_role.arn}"
  handler          = "write_to_dynamo.handler"
  runtime          = "nodejs14.x"
  source_code_hash = "${filebase64sha256("${path.module}/lambda_code/write_to_dynamo.js.zip")}"
  tracing_config {
    mode = "Active"
  }
  environment {
    variables = {
    }
  }
}