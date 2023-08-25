import React, { useState, useEffect, useRef } from "react";
import { PlatformLayout } from "../../../templates/PlatformLayout";
import styled from "styled-components";
import { Message } from "../../../interfaces/types";

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const ChatBox = styled.div`
  width: 100%;
  max-width: 400px;
  border: 2px solid ${({ theme }) => theme.purple};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const ChatHeader = styled.div`
  background-color: ${({ theme }) => theme.purple};
  color: #fff;
  padding: 10px;
  text-align: center;
  font-weight: bold;
`;

const ChatMessages = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: flex-start;
  overflow-y: auto;
  max-height: 400px;
`;

const MessageContainer = styled.div<{ isUser: boolean }>`
  display: flex;
  align-items: flex-start;
  justify-content: ${({ isUser }) => (isUser ? "flex-end" : "flex-start")};
  width: 100%;
`;

const MessageBubble = styled.div<{ isUser: boolean }>`
  background-color: ${({ isUser }) => (isUser ? "#007bff" : "#f0f0f0")};
  color: ${({ isUser }) => (isUser ? "#fff" : "#333")};
  border-radius: ${({ isUser }) =>
    isUser ? "20px 20px 0 20px" : "20px 20px 20px 0"};
  padding: 10px 15px;
  max-width: 70%;
`;

const UserInputContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border-top: 1px solid #ddd;
  background-color: #fff;
`;

const UserInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  padding: 10px;
  border-radius: 20px;
`;

export const AIPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = () => {
    if (inputText.trim() !== "") {
      const newMessage: Message = {
        text: inputText,
        isUser: true,
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInputText("");
    }
  };
  useEffect(() => {
    if (messages.length > 0 && messages[messages.length - 1].isUser) {
      setTimeout(() => {
        const botResponse: Message = {
          text: "Hello! I'm your friendly AI bot.",
          isUser: false,
          isBot: true,
        };
        setMessages((prevMessages) => [...prevMessages, botResponse]);
      }, 1000);
    }
  }, [messages]);

  return (
    <PlatformLayout>
      <ChatContainer>
        <ChatBox>
          <ChatHeader>AI Chat</ChatHeader>
          <ChatMessages>
            {messages.map((message, index) => (
              <MessageContainer key={index} isUser={message.isUser}>
                <MessageBubble isUser={message.isUser}>
                  {message.text}
                </MessageBubble>
              </MessageContainer>
            ))}
            <div ref={messagesEndRef} />
          </ChatMessages>
          <UserInputContainer>
            <UserInput
              type="text"
              placeholder="Type your message..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSendMessage();
                }
              }}
            />
          </UserInputContainer>
        </ChatBox>
      </ChatContainer>
    </PlatformLayout>
  );
};
