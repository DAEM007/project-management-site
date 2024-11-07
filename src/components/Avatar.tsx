import "./Avatar.css";

interface AvatarProps {
  src: string;
}

const Avatar = ({ src }: AvatarProps) => {
  return (
    <div className="avatar">
      <img src={src} alt="avatar-pic" />
    </div>
  );
};

export default Avatar;
