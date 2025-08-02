

const clearChat = async (req, res) => {
  const userId = req.user._id; // assuming verifyUser middleware sets this
  const { targetUserId } = req.params;

  try {
    const chat = await Chat.findOne({
      participants: { $all: [userId.toString(), targetUserId] },
    });

    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }

    chat.messages = []; // clear messages array
    await chat.save();

    res.status(200).json({ message: 'Chat cleared' });
  } catch (err) {
    console.error('Error clearing chat:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { clearChat };
