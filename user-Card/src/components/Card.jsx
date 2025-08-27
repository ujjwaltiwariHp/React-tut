function Card({ name, role, email, imgUrl ,contact}) {
  const firstLetter = name ? name.charAt(0).toUpperCase() : "?";

  // random color generator
//   const colors = ["#ffadad", "#ffd6a5", "#fdffb6", "#caffbf", "#9bf6ff", "#a0c4ff", "#bdb2ff", "#ffc6ff"];
  const colors1 = ["#ff6f61", "#ff9671", "#ffc75f", "#f9f871", "#2cd9ff", "#845ec2", "#d65db1", "#ff5e78"]

//   const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const randomColor1 = colors1[Math.floor(Math.random() * colors1.length)];
  return (
    <div className="card" >
      {imgUrl ? (
        <img src={imgUrl} alt={name} className="card-img" />
      ) : (
        <div className="avatar-fallback" style={{ backgroundColor: randomColor1 }}>{firstLetter}</div>
      )}

      <h2 className="card-title">{name}</h2>
      <p className="card-role">{role}</p>
      <p className="contact"><p>📞 {contact}</p></p>
      <a href={`mailto:${email}`} className="email-btn">
        {email}
      </a>
    </div>
  );
}

export default Card;
