---
title: "Understanding Neural Networks"
layout: post
description: "Neural networks are a powerful tool in the field of machine learning, enabling computers to learn and make predictions based on data. At the core of a neural network are individual units called neurons, which mimic the behavior of biological neurons in the human brain. In this article, we will explore the fundamentals of neural networks by examining a single neuron and its role in binary classification tasks. We will also delve into gradient descent, activation functions, and optimizers, essential concepts for training neural networks."
excerpt: "Neural networks are a powerful tool in the field of machine learning, enabling computers to learn and make predictions based on data. At the core of a neural network are individual units called neurons, which mimic the behavior of biological neurons in the human brain. In this article, we will explore the fundamentals of neural networks by examining a single neuron and its role in binary classification tasks. We will also delve into gradient descent, activation functions, and optimizers, essential concepts for training neural networks."
date: '2023-06-05 17:31:36'
image: "/images/blogs/neural_networks/neural_networks.jpg"
image_caption: 'Photo by <a href="https://unsplash.com/@jjying?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">JJ Ying</a> on <a href="https://unsplash.com/photos/8bghKxNU1j0?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>'
author: "Balakrishnan Sathiyakugan"
tags:
- deep_learning
- data_science
- neural_networks
---
## The Single Neuron:
A neuron in a neural network is responsible for processing inputs and producing an output. In the context of binary classification, the neuron takes a set of features as input and outputs a prediction indicating which class the input belongs to. For simplicity, let's consider a single neuron with two inputs, x₁ and x₂, and a single output, y.

## Weighted Sum and Bias:
A neuron in a neural network is responsible for processing inputs and producing an output. In the context of binary classification, the neuron takes a set of features as input and outputs a prediction indicating which class the input belongs to. For simplicity, let's consider a single neuron with two inputs, x₁ and x₂, and a single output, y.

z = (w₁ * x₁) + (w₂ * x₂) + b

## Activation Function:
The weighted sum alone is insufficient for generating a meaningful output. To introduce non-linearity and make the neuron capable of learning complex patterns, an activation function is applied to the weighted sum. The activation function maps the weighted sum to a desired output range. For binary classification tasks, a commonly used activation function is the sigmoid function:
y = σ(z) = 1 / (1 + exp(-z))

The sigmoid function squashes the weighted sum into a range between 0 and 1, representing the probability of the input belonging to one of the two classes.

## Gradient Descent:
To train the neuron and adjust its weights and bias, we utilize an optimization algorithm called gradient descent. Gradient descent aims to find the optimal set of weights and bias that minimize the difference between the predicted output and the actual target output for a given input.

First, we define a loss function that quantifies the discrepancy between the predicted output and the target output. In binary classification, a commonly used loss function is the binary cross-entropy loss:

L = -(y_target * log(y_pred) + (1 - y_target) * log(1 - y_pred))

The goal of gradient descent is to minimize this loss function. It does so by iteratively updating the weights and bias in the opposite direction of the gradient of the loss function with respect to these parameters. This adjustment continues until the algorithm converges to the minimum of the loss function, effectively optimizing the neuron's performance.

## Optimizers:
While gradient descent forms the foundation of optimizing neural networks, various optimization algorithms called optimizers enhance its effectiveness and efficiency. Optimizers control the learning rate, adjust the step size of weight updates, and help avoid potential pitfalls like getting stuck in local minima.
Popular optimizers include Stochastic Gradient Descent (SGD), Adaptive Moment Estimation (Adam), and Root Mean Square Propagation (RMSProp). Each optimizer has its own advantages and adjusts the weights and bias in different ways during the training process.

### Conclusion:
Neural networks, composed of interconnected neurons, offer remarkable capabilities for solving complex machine learning problems. In this article, we explored the workings of a single neuron in the context of binary classification. We learned about the weighted sum, activation functions

## Reference

1. [Power of a Single Neuron](https://towardsdatascience.com/power-of-a-single-neuron-perceptron-c418ba445095)
2. [Understanding a Single Neuron’s role in Neural Network.](https://medium.com/analytics-vidhya/understanding-a-single-neurons-role-in-neural-network-77bb3251e9db)
3. [Deep neural networks using a single neuron: folded-in-time architecture using feedback-modulated delay loops](https://www.nature.com/articles/s41467-021-25427-4)
4. [Understanding Neural Networks](https://towardsdatascience.com/understanding-neural-networks-19020b758230)