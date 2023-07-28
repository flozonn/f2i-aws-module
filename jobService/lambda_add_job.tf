resource "aws_lambda_function" "add_job" {
  filename         = "${path.module}/lambda_code/add_job.js.zip"
  function_name    = "add_job"
  role             = "${aws_iam_role.add_job_role.arn}"
  handler          = "add_job.handler"
  runtime          = "nodejs14.x"
  source_code_hash = "${filebase64sha256("${path.module}/lambda_code/add_job.js.zip")}"
  tracing_config {
    mode = "Active"
  }
  environment {
    variables = {
    }
  }
}