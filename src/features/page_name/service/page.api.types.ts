export type GetUploadUrlRes = {
	"operation_id": string
	"method": string
	"href": string
	"templated": boolean
}

export type GetDiskDataRes = {
	max_file_size: number;
	paid_max_file_size: number;
	total_space: number;
	reg_time: string;
	trash_size: number;
	is_paid: boolean;
	used_space: number;
	system_folders: SocialType;
	user: UserType;
	unlimited_autoupload_enabled: boolean;
	revision: number;
}
export type SocialType = {
	odnoklassniki: string;
	google: string;
	instagram: string;
	vkontakte: string;
	attach: string;
	mailru: string;
	downloads: string;
	applications: string;
	facebook: string;
	social: string;
	messenger: string;
	calendar: string;
	scans: string;
	screenshots: string;
	photostream: string;
}
export type UserType = {
	reg_time: string;
	display_name: string;
	uid: string;
	country: string;
	is_child: boolean;
	login: string;
}
