resource "aws_apigatewayv2_api" "gateway" {
  name          = "jobService"
  protocol_type = "HTTP"
}

resource "aws_apigatewayv2_integration" "int_add_job" {
  api_id             = aws_apigatewayv2_api.gateway.id
  integration_type   = "AWS_PROXY"
  connection_type    = "INTERNET"
  integration_method = "POST"
  integration_uri    = aws_lambda_function.add_job.invoke_arn
}

resource "aws_apigatewayv2_route" "route_add_job" {
  api_id    = aws_apigatewayv2_api.gateway.id
  route_key = "POST /addJob"
  target    = "integrations/${aws_apigatewayv2_integration.int_add_job.id}"
}


resource "aws_lambda_permission" "allow_add_job_invocation" {
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.add_job.arn
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.gateway.execution_arn}/*/*"
  statement_id  = "AllowExecutionFromAPIGateway"
}

resource "aws_apigatewayv2_stage" "prod" {
  api_id      = aws_apigatewayv2_api.gateway.id
  name        = "prod"
  auto_deploy = true
}

output "stage_endpoint" {
  value = aws_apigatewayv2_stage.prod.invoke_url
}