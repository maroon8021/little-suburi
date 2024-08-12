terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "5.40.0"
    }
  }
}

resource "google_artifact_registry_repository" "console_log_example_repository" {
  project       = var.project_id
  location      = var.location
  repository_id = "console-log-example"
  format        = "DOCKER"
}

resource "google_cloud_run_v2_service" "console_log_example_cloud_run_service" {
  project  = var.project_id
  location = var.location
  name     = "console-log-example"
  ingress  = "INGRESS_TRAFFIC_ALL"

  template {
    scaling {
      min_instance_count = 0
      max_instance_count = 1
    }
    containers {
      image = "${google_artifact_registry_repository.console_log_example_repository.location}-docker.pkg.dev/${var.project_id}/${google_artifact_registry_repository.console_log_example_repository.repository_id}/init:latest"
    }
  }
}

resource "google_cloud_run_v2_service_iam_member" "console_log_example_cloud_run_service_iam_member" {
  location = var.location
  project  = var.project_id
  role     = "roles/run.invoker"
  member   = "allUsers"
  name     = google_cloud_run_v2_service.console_log_example_cloud_run_service.name
}
