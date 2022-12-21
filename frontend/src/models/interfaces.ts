export interface PostInterface {
  createdAt: string;
  creator: {
    _id: string;
    username: string;
    profilePicture: string;
  };
  desc: string;
  likes: [];
  imageUrl: string;
  _id: string;
}

export interface JobInterface {
  id: string;
  location: {
    display_name: string;
  };
  created: string;
  company: string;
  title: string;
  minSalary: string;
  maxSalary: string;
  redirect_url: string;
}

export interface ProfileInterface {
  _id: string;
  username: string;
  email: string;
  profilePicture: string;
  coverPicture: string;
  city: string;
  from: string;
  gender: string;
  followers: [];
  followings: [];
  isFollowed: boolean | undefined;
}
