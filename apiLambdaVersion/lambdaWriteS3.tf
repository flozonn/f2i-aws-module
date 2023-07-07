
resource "aws_lambda_function" "writeToS3" {
  filename         = "${path.module}/lambda_code/writeToS3.js.zip"
  function_name    = "writeToS3"
  role             = "${aws_iam_role.role.arn}"
  handler          = "writeToS3.handler"
  runtime          = "nodejs14.x"
  source_code_hash = "${filebase64sha256("${path.module}/lambda_code/writeToS3.js.zip")}"
  environment {
    variables = {
    }
  }
}