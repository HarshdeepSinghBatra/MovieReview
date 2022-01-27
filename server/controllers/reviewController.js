const db = require("../config/db.js");

// const getReviews = async (req,res) => {
//     const { m_id }= req.params;
//     const userId = req.userId;
//     console.log(userId);
//     const query = await db.query('SELECT * FROM reviews WHERE m_id=$1 AND u_id=$2 ORDER BY r_id DESC',[parseInt(m_id), userId]);
//     res.send(query.rows)
//     // console.log(query)
// }

const getReviews = async (req, res) => {
  const { m_id } = req.params;
  const query = await db.query(
    "SELECT A.review,A.m_id,A.date,A.rating,B.name FROM reviews A, users B WHERE A.u_id = B.id AND A.m_id=$1 ORDER BY A.r_id DESC",
    [parseInt(m_id)]
  );

  const data = query.rows;
    
  // console.log(data)

  res.send(data);
};

const getLoggedInReviews = async (req, res) => {
  const { m_id } = req.params;
  const userId = req.userId;
  const query = await db.query(
    "SELECT A.review,A.m_id,A.date,A.rating,B.name FROM reviews A, users B WHERE A.u_id = B.id AND A.m_id=$1 AND A.u_id != $2 ORDER BY A.r_id DESC",
    [parseInt(m_id),parseInt(userId)]
  );
  const data = query.rows;
  res.send(data)
}

const getUserReview = async (req, res) => {
  const { m_id } = req.params;
  const userId = req.userId;
  const query = await db.query(
    "SELECT A.review,A.m_id,A.date,A.rating,B.name FROM reviews A, users B WHERE A.u_id = B.id AND A.m_id=$1 AND A.u_id=$2 ORDER BY A.r_id DESC",
    [parseInt(m_id), parseInt(userId)]
  );
  const data = query.rows;
  if (data.length === 0) {
    res.status(500).send('No review from this user')
  } else {
    // console.log(data)
    res.send(data)
  }
  
}

const postReview = async (req, res) => {
  const { reviewText, m_id, date, rating } = req.body;
  // const reviewText = req.body.reviewText;
  const userId = req.userId;
  const query = await db.query(
    "INSERT INTO reviews (review, u_id, m_id, date, rating) VALUES ($1,$2,$3, $4, $5)",
    [reviewText, userId, m_id, date, rating]
  );
  res.send("Review added");
  // console.log(query)
};

const updateReview = async (req, res) => {
  const { reviewText, m_id, rating } = req.body;
  const userId = req.userId;
  const query = await db.query('UPDATE reviews SET review=$1, rating=$2 WHERE m_id=$3 AND u_id=$4', [reviewText, rating, m_id, userId]);
  res.send("Review updated");
}

const deleteReview = async (req, res) => {
  const { m_id } = req.params;
  const userId = req.userId;
  const query = await db.query("DELETE FROM reviews WHERE m_id=$1 AND u_id=$2", [m_id, userId]);
  res.send("Review deleted");
}

module.exports = {
  getReviews,
  getLoggedInReviews,
  getUserReview,
  postReview,
  updateReview,
  deleteReview
};
