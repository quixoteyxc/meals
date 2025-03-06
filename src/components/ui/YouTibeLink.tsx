export const YouTubeLink = ({
  videoLink,
  mealName,
}: {
  videoLink: string;
  mealName: string;
}) => (
  <div className="mt-8">
    <h2 className="text-2xl font-semibold mb-4">Watch on YouTube</h2>
    <a
      href={videoLink}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-500 inline-block"
    >
      {mealName} on YouTube
    </a>
  </div>
);
