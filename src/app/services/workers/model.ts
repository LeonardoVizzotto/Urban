export interface AvailableWorker {
  slot_id: number;
  availableWorker_ids: number[];
}

export interface Worker {
  id: number;
  name: string;
  rating: string;
  isNew: boolean;
  profilePicture?: Picture;
}

export interface Picture {
  large: string;
  medium: string;
  thumbnail: string;
}
