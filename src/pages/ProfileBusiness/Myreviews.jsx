import { Heart, Bookmark, MoreHorizontal } from "lucide-react";
import { useState } from "react";

const Myreviews = () => {
  return (
    <div className="p-4 space-y-4 mb-6">
    {[1, 2, 3, 4, 5].map((post) => (
                            <div key={post} className="p-4 border rounded-lg shadow-sm  text-white">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-lg font-semibold">Post Title</h3>
                                    <MoreHorizontal className="w-5 h-5" />
                                </div>
                                <p className="text-sm text-gray-100">by Peter Parker <span className="font-bold text-yellow-300">@spiderman2000</span></p>
                                <p className="text-sm mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
                                <div className="flex justify-between text-gray-300 text-sm mt-4">
                                    <div className="flex gap-2">
                                        <Heart className="w-4 h-4" /> 24
                                        <Bookmark className="w-4 h-4" /> 24
                                    </div>
                                    <p className="underline">View Full Post</p>
                                </div>
                            </div>
    ))}
</div>
  )
}

export default Myreviews
