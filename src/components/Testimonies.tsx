import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

export function AnimatedTestimonialsDemo() {
  const testimonials = [
    // {
    //   quote:
    //     "The personalized questions helped me prepare for my dream job. The AI-generated scenarios felt like real interviews!",
    //   name: "Aarav Patel",
    //   designation: "Software Engineer at CodeCraft",
    //   src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    // },
    {
      quote:
        "The real-time feedback feature is a game-changer. It helped me identify my weaknesses and improve my answers quickly.",
      name: "Sophia Williams",
      designation: "Marketing Specialist at BrandHive",
      src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "The mock interviews were incredibly realistic. I felt confident and prepared when I went for my actual interview.",
      name: "Rohan Mehta",
      designation: "Data Analyst at InsightCorp",
      src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "Tracking my progress over time gave me the confidence to tackle even the toughest interviews. Highly recommend this platform!",
      name: "Emily Johnson",
      designation: "HR Manager at PeopleFirst",
      src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    // {
    //   quote:
    //     "This platform is a must-have for anyone preparing for interviews. The AI-powered insights are unmatched!",
    //   name: "Ananya Sharma",
    //   designation: "Product Manager at InnovateX",
    //   src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    // },
  ];
  return <AnimatedTestimonials testimonials={testimonials} />;
}
