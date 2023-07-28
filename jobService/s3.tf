resource "aws_s3_bucket" "content_bucket" {
  bucket = "contentbucket546541320"
}

output "apiBucketId" {
  value = "${aws_s3_bucket.content_bucket.id}"
}
output "apiBucketArn" {
  value = "${aws_s3_bucket.content_bucket.arn}"
}