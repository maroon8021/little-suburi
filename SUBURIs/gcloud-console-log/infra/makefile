TIMESTAMP := $(shell date +%Y-%m-%d-%H:%M)

# make push PROJECT_ID=your_project_id IMAGE_NAME=your_image_name
.PHONY: push
push:
	# get unix timestamp
	$(eval IMAGE_TAG := $(if $(IMAGE),$(IMAGE),$(shell date '+%s')))

	# 削除対象イメージのリストを取得
	$(eval IMAGE_IDS := $(shell docker images 'asia-northeast1-docker.pkg.dev/${PROJECT_ID}/console-log-example/*' -q))

	# イメージが存在する場合に削除を実行
	@if [ -n "$(IMAGE_IDS)" ]; then \
		docker rmi $(IMAGE_IDS); \
	fi
	docker build --build-arg BUILD_DATE=${TIMESTAMP} --platform linux/amd64 --no-cache -t asia-northeast1-docker.pkg.dev/${PROJECT_ID}/console-log-example/${IMAGE_TAG}:latest .
	docker push asia-northeast1-docker.pkg.dev/${PROJECT_ID}/console-log-example/${IMAGE_TAG}:latest

.PHONY: run
run:
	docker run -p 8080:8080 asia-northeast1-docker.pkg.dev/${PROJECT_ID}/console-log-example/${IMAGE_TAG}:latest

.PHONY: ta
ta:
	terraform apply -auto-approve
	
.PHONY: td
td:
	terraform destroy -auto-approve
