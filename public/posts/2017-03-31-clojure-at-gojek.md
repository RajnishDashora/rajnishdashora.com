---
title: "Clojure at GOJEK"
date: "March 31, 2017"
excerpt: "How Gojek adopted Clojure for high-scale services, the challenges faced, and the benefits of functional programming in production."
---

## Introduction

> *"You can reach a point with Lisp where, between the conceptual simplicity, the large libraries, and the customisation of macros, you are able to write only code that matters. And, once there, you are able to achieve a very high degree of focus, such as you would when you are playing Go, or playing a musical instrument, or meditating. And then, as with those activities, there can be a feeling of elation that accompanies that mental state of focus."  – Rich Hickey*

## Why Clojure?

At GO-JEK, we believe in the fact that when you are not enjoying, you are not performing. Here we are with more then 15 million customers and more then 200K drivers who are the breath of GO-JEK, our heart runs with Clojure i.e. the allocations which happen through the journey of a booking for drivers by customers.

Not just this we do have various services running on Clojure to serve our customers. We have more then 15 services offered primarily around logistics, payments and basic household requirements, we affect life in Indonesia on a daily basis.

## The Benefits

Such a high scale demands concurrency. Being a Lisp, Clojure gives you focus on the significant aspects of code. Speaking of advantages of Clojure, it is worth highlighting better language abstractions lead to a fewer accidental bugs and downtime.

A functional programming language bundled with loads of benefits like:
- Laziness
- Immutability
- Code as data
- And more...

More mature libraries and JVM based ecosystem makes Clojure a great language to play with. Better support for monitoring, debugging, profiling and generative testing catches many holes in implementation pre-emptively.

With Clojure we have been able to achieve:
- Higher confidence while making changes
- Faster release cycles
- Higher level of satisfaction amongst developers

Development is isolated from real world to send or consume traffic along with feature toggles to selectively stop real effects and run experiments with life.

## The Challenges

We do face challenges with Clojure, such as:
- Longer warm up time
- Longer testing time
- Higher memory usages
- Sometimes a slower developer on-boarding time due to non-functional mind-sets

## Conclusion

Though we are doing great with respect to what we have achieved with Clojure so far and looking forward to be able to keep it up and contribute back to the Clojure community which has been a great help through out the journey.
