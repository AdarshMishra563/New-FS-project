import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const API_BASE_URL = "http://localhost:8000/api/challenges/";

const ChallengeList = () => {
  const [challenges, setChallenges] = useState([]);
  const [newChallenge, setNewChallenge] = useState({ title: "", description: "", points: null, difficulty: null });
  const [completedChallenges, setCompletedChallenges] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    fetchChallenges();
    fetchLeaderboard();
  }, []);

  const fetchChallenges = async () => {
    try {
      const response = await axios.get(API_BASE_URL, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      setChallenges(response.data);
    } catch (error) {
      console.error("Error fetching challenges:", error);
    }
  };

  const fetchLeaderboard = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/leaderboard/", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      setLeaderboard(response.data);
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
    }
  };

  const handleChange = (e) => {
    setNewChallenge({ ...newChallenge, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_BASE_URL, newChallenge, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      setNewChallenge({ title: "", description: "", points: null, difficulty: null });
      fetchChallenges();
    } catch (error) {
      console.error("Error adding challenge:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}${id}/`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      fetchChallenges();
    } catch (error) {
      console.error("Error deleting challenge:", error);
    }
  };

  const chartData = {
    labels: challenges.map((ch) => ch.title),
    datasets: [
      {
        label: "Points Earned",
        data: challenges.map((ch) => ch.points),
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Challenges</h1>
      
      <h2 className="text-xl font-bold mt-4">User Dashboard</h2>
      <Bar data={chartData} />
      <p>Completed Challenges: {completedChallenges.length}</p>
      <p>Achievements: 🏆🎖️</p>
      
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          name="title"
          placeholder="Challenge Title"
          value={newChallenge.title}
          onChange={handleChange}
          className="border p-2 mr-2"
        />
        <input
          type="number"
          name="points"
          placeholder="Points"
          value={newChallenge.points}
          onChange={handleChange}
          className="border p-2 mr-2"
        />
        <select name="difficulty" value={newChallenge.difficulty} onChange={handleChange} className="border p-2 mr-2">
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={newChallenge.description}
          onChange={handleChange}
          className="border p-2 mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">Add</button>
      </form>

      <ul>
        {challenges.map((challenge) => (
          <li key={challenge.id} className="p-2 border-b flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">{challenge.title}</h3>
              <p>{challenge.description}</p>
              <p className="text-sm text-gray-500">Points: {challenge.points}, Difficulty: {challenge.difficulty}</p>
            </div>
            <button onClick={() => handleDelete(challenge.id)} className="bg-red-500 text-white px-4 py-2">Delete</button>
          </li>
        ))}
      </ul>

      <h2 className="text-xl font-bold mt-4">Community Leaderboard</h2>
      <ul>
        {leaderboard.map((user, index) => (
          <li key={index} className="p-2 border-b">
            {index + 1}. {user.username} - {user.points} points
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChallengeList;
