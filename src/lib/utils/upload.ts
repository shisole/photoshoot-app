export function uploadWithProgress(
	url: string,
	file: File | Blob,
	onProgress: (percent: number) => void
): Promise<void> {
	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();
		xhr.open('POST', url);
		xhr.setRequestHeader('Content-Type', 'image/jpeg');

		xhr.upload.onprogress = (e) => {
			if (e.lengthComputable) {
				onProgress(Math.round((e.loaded / e.total) * 100));
			}
		};

		xhr.onload = () => {
			if (xhr.status >= 200 && xhr.status < 300) {
				resolve();
			} else {
				reject(new Error('Failed to upload photo'));
			}
		};

		xhr.onerror = () => reject(new Error('Upload failed'));
		xhr.send(file);
	});
}
