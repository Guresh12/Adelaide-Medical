export const testimonials = [
  {
    id: 1,
    name: "Margaret Thompson",
    role: "Family Member",
    content: "Adelaide Medical Services has been a blessing for our family. The nurses who care for my mother are not only skilled but genuinely compassionate. They treat her like family.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: 2,
    name: "Robert Martinez",
    role: "Patient",
    content: "After my hip surgery, I was worried about recovery at home. The post-surgery care from Adelaide Medical Services exceeded all expectations. Professional, punctual, and caring.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: 3,
    name: "Susan Park",
    role: "Family Member",
    content: "Finding quality home care for my elderly parents was stressful until we found Adelaide Medical Services. The peace of mind they provide is priceless. Highly recommended!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: 4,
    name: "James Wilson",
    role: "Patient",
    content: "The wound care service is exceptional. My nurse was meticulous and always made sure I understood my treatment plan. Recovery was faster than expected.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
  },
];

export type Testimonial = typeof testimonials[number];
