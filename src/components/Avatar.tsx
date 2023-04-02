import avatarImg from "../assets/image-avatar.jpg";

const Avatar = () => {
  return (
    <div className=" border-0 border-l-[1px] border-l-[#494E6E] px-6 py-5">
      <img
        className="inline-block aspect-square w-8 rounded-full"
        src={avatarImg}
        alt=""
      />
    </div>
  );
};

export default Avatar;
