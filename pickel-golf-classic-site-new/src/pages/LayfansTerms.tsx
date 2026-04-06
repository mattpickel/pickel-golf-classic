import React from 'react';
import Container from '../components/Container';

const LayfansTerms: React.FC = () => {

    return (
        <Container>
            <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
                <img src="/images/layfans.PNG" alt="Layfan's Terms" className="w-1/3 sm:w-1/4 rounded-lg shadow-md"></img>
                <div className="text-center sm:text-left">
                    <p className="font-display text-xl md:text-2xl text-green-900 font-bold">Find us on your preferred podcast platform!</p>
                    <div className="flex justify-center sm:justify-start space-x-4 mt-4">
                        <a href="https://open.spotify.com/show/0JR0L4rs45EyJngvZHgStk" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
                            <img src="/images/Spotify_icon.svg" alt="Spotify" className="h-8" />
                        </a>
                        <a href="https://podcasts.apple.com/us/podcast/layfans-terms/id1665276797" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
                            <img src="/images/apple-podcasts.svg" alt="Apple Podcasts" className="h-8" />
                        </a>
                        <a href="https://music.amazon.com/podcasts/a1dbe45a-ee80-4e42-8142-90d57e8de784/layfan's-terms" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
                            <img src="/images/amazon-music.svg" alt="Amazon Music" className="h-8" />
                        </a>
                        <a href="https://play.pocketcasts.com/" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
                            <img src="/images/pocketcasts.svg" alt="Pocket Casts" className="h-8" />
                        </a>
                    </div>
                </div>
            </div>

            <div className="gold-divider mb-5"></div>

            <div className="space-y-4 font-body text-gray-700 leading-relaxed">
                <p>
                    The 6th Annual Pickel Golf Classic is presented by Layfan's Terms, your favorite source for
                    sports news and commentary.
                </p>
                <p>
                    In high-school, best buds Donnie, Daniel, Clint, and Cole played a combined total of 7 different
                    sports and received a combined total of 0 scholarships. Rather than begrudge their athletic prowess
                    (or lack thereof), they embrace their mediocrity as they celebrate their lifelong love of sports.
                </p>
                <p>
                    Join the crew as they discuss major topics, local Tennessee rumors, and so, so much more &mdash; all
                    from the Layfan's perspective! Listen and subscribe on your favorite podcast platform!
                </p>
            </div>
        </Container>
    );
}

export default LayfansTerms;
