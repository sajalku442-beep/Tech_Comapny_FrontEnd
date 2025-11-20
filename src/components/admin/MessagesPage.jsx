import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Trash2, Mail, Calendar } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { CONTACT_API_END_POINT } from "../utils/constant"; // ADD contact API here
import { useSelector } from "react-redux";
import useGetallcontact from "../hookes/getallcontact";

const MessagesPage = () => {
  useGetallcontact();
  const { allContacts } = useSelector((store) => store.contact);
  const [messages, setMessages] = useState(allContacts || []);
  const { token } = useSelector((store) => store.auth);

  // Fetch messages from backend
  // const loadMessages = async () => {
  //   try {
  //     const res = await axios.get(`${CONTACT_API_END_POINT}/all`, {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Auth: token,
  //       },
  //       withCredentials: true,
  //     });

  //     if (res.data.success) {
  //       console.log(res.data.contacts);

  //       setMessages(res.data.contacts);
  //     } else {
  //       toast.error(res.data.message);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     toast.error("Failed to fetch messages");
  //   }
  // };

  // useEffect(() => {
  //   loadMessages();
  // }, []);

  // Delete Message
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${CONTACT_API_END_POINT}/delete/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Auth: token,
        },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success("Message deleted");

        // Remove from UI
        setMessages((prev) => prev.filter((msg) => msg._id !== id));
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete message");
    }
  };

  return (
    <div className="text-white">
      {/* Page Title */}
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-3xl font-bold mb-6"
      >
        Contact Messages Inbox
      </motion.h1>

      {/* Messages List */}
      <div className="space-y-6">
        {messages.length === 0 && (
          <p className="text-gray-400 text-center">No messages yet.</p>
        )}

        {messages.map((msg, index) => (
          <motion.div
            key={msg._id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            className="p-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">{msg.fullName}</h3>

              <button
                onClick={() => handleDelete(msg._id)}
                className="text-red-400 hover:text-red-500"
              >
                <Trash2 size={20} />
              </button>
            </div>

            {/* Email */}
            <div className="flex items-center gap-2 text-gray-300 mt-2">
              <Mail size={16} />
              <span>{msg.email}</span>
            </div>

            {/* Message Text */}
            <p className="text-gray-200 mt-4 leading-relaxed">
              {msg.projectDetails}
            </p>

            {/* Date */}
            <div className="flex items-center gap-2 text-gray-400 text-sm mt-4">
              <Calendar size={14} />
              {new Date(msg.createdAt).toLocaleDateString()}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MessagesPage;
