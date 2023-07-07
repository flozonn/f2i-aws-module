
resource "aws_lambda_function" "sendBonjour" {
  filename         = "${path.module}/lambda_code/sendBonjour.js.zip"
  function_name    = "sendBonjour"
  role             = "${aws_iam_role.role.arn}"
  handler          = "sendBonjour.handler"
  runtime          = "nodejs14.x"
  source_code_hash = "${filebase64sha256("${path.module}/lambda_code/sendBonjour.js.zip")}"
  environment {
    variables = {
    }
  }
}