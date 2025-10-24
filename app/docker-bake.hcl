target "default" {
  inherits = [ "backend" ]
}

target "backend-metadata" {
}

target "backend" {
  inherits = [ "backend-metadata" ]
  context = "app/backend"
  dockerfile = "Dockerfile"
  platforms = [ "linux/amd64", "linux/arm64" ]
}
