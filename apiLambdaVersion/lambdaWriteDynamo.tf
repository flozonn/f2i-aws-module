

resource "aws_lambda_function" "writeToDynamo" {
  filename         = "${path.module}/lambda_code/writeToDynamo.js.zip"
  function_name    = "writeToDynamo"
  role             = "${aws_iam_role.role.arn}"
  handler          = "writeToDynamo.handler"
  runtime          = "nodejs14.x"
  source_code_hash = "${filebase64sha256("${path.module}/lambda_code/writeToDynamo.js.zip")}"
  environment {
    variables = {
    }
  }
}