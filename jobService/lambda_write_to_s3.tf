resource "aws_lambda_event_source_mapping" "lambda_s3Write_trigger" {
  event_source_arn = aws_dynamodb_table.job_table.stream_arn
  function_name    = aws_lambda_function.write_to_s3.function_name
  starting_position = "LATEST"
  batch_size = 1
}

resource "aws_lambda_function" "write_to_s3" {
  filename         = "${path.module}/lambda_code/write_to_s3.js.zip"
  function_name    = "write_to_s3"
  role             = "${aws_iam_role.write_to_s3_role.arn}"
  handler          = "write_to_s3.handler"
  runtime          = "nodejs14.x"
  source_code_hash = "${filebase64sha256("${path.module}/lambda_code/write_to_s3.js.zip")}"
  tracing_config {
    mode = "Active"
  }
  environment {
    variables = {
    }
  }
}