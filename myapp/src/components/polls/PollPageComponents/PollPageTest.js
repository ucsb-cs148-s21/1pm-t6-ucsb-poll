import React, { Component,useState } from "react";
//import './PollPageTest.css'

class PollPageTest extends Component {
    pollid=this.props.location.pathname.substring(this.props.location.pathname.lastIndexOf('/') + 2).slice(0, -1);
    render(){
        return(
        <div>
		<div class="poll-outer-wrapper">
	      <div class="inner-wrapper lrg">

	        <div class="poll-head">
	          <div class="poll-wrapper">
	            <div class="poll-heading">
	              <p class="poll-tag book">Books</p>
	              <h1 class="standard">Vote for June Book! 📢💡</h1>
	              <div class="author-date">Asked by </div>
                  <div class="user-profile-info-wrapper">
											<a href="https://fast-poll.com/MrAnas" class="user-profile-dropdown-link">
												Anas Fahad											</a>
											
											<div class="user-profile-dropdown-outer">
												<div class="user-profile-dropdown-wrapper animated-dropdown bounceIn">

												</div>
											</div>
										</div>
	                	                <time class="timeago" datetime="2021-05-21T19:41:38+0000" title="21st May 2021">about 5 hours ago</time>
	              </div>

								
								<div class="item-inline-wrapper">

																			<div class="item-share-inline-wrapper">
											<div class="item-dropdown-wrapper">
												<a href="#" class="item-link-share-inline" title="Share">Share</a>
												<div class="item-dropdown animated-dropdown bounceIn social-share-links inline ">
													<div class="item-dropdown-links-wrapper">
														<div class="item-dropdown-inner">
															<a href="https://twitter.com/intent/tweet/?text=Vote for June Book! 📢💡%20Vote%20now%20at%20&amp;url=https://fast-poll.com/poll/8f600a24" target="_blank" class="twitter-dropdown-link" title="Share on Twitter">Share on Twitter</a>
															<a href="https://www.facebook.com/sharer/sharer.php?u=https://fast-poll.com/poll/8f600a24" target="_blank" class="fb-dropdown-link" title="Share on Facebook">Share on Facebook</a>
															<a href="https://api.whatsapp.com/send?text=Vote for June Book! 📢💡%20-%20Vote%20now%20at%20https://fast-poll.com/poll/8f600a24" target="_blank" class="whatsapp-dropdown-link" title="Share on WhatsApp">Share on WhatsApp</a>
															<a href="#" data-reveal-id="copy-url-modal" class="url-dropdown-link" title="Share Link">Share Link</a>
															<a href="#" data-reveal-id="qr-code-modal" class="qr-code-dropdown-link" title="Share QR Code">Share QR Code</a>
														</div>
													</div>
												</div>
											</div>
										</div>
									
																	</div>
	            </div>
	          </div>
	        </div>

	        <div class="poll-wrapper">
	          <div class="poll-results" style="position: relative; height: 688px;">

						
	            <div class="poll-item orange mix most-voted" data-id="8f68a6ff-ba6c-11eb-8dc9-020055" data-order="3" style="position: absolute; left: 0px; top: 0px;">

								
	              <div class="poll-results-heading">
	                <h2 class="name">Start With Why</h2>
	                <p class="percent">50%
	                </p>
	              </div>

	              <div class="poll-results-bar">
	                <div class="poll-bar" style="width:50%;"></div>
	              </div>

	              <div class="poll-votes-number" data-votes="3">
	                <p>
										<span class="votes" id="inline-vote-8f68a6ff-ba6c-11eb-8dc9-020055">3</span>
	                  Votes
	                </p>
									<span class="count" style="display:none">3</span>
									<span class="order" style="display:none">3</span>
	              </div>

	            </div>

	          
	            <div class="poll-item red mix" data-id="8f6888b3-ba6c-11eb-8dc9-020055" data-order="2" style="position: absolute; left: 0px; top: 172px;">

								
	              <div class="poll-results-heading">
	                <h2 class="name">Software Engineering at Google</h2>
	                <p class="percent">33%
	                </p>
	              </div>

	              <div class="poll-results-bar">
	                <div class="poll-bar" style="width:33%;"></div>
	              </div>

	              <div class="poll-votes-number" data-votes="2">
	                <p>
										<span class="votes" id="inline-vote-8f6888b3-ba6c-11eb-8dc9-020055">2</span>
	                  Votes
	                </p>
									<span class="count" style="display:none">1</span>
									<span class="order" style="display:none">2</span>
	              </div>

	            </div>

	          
	            <div class="poll-item green mix" data-id="8f689e78-ba6c-11eb-8dc9-020055" data-order="1" style="position: absolute; left: 0px; top: 344px;">

								
	              <div class="poll-results-heading">
	                <h2 class="name">Lean Enterprise</h2>
	                <p class="percent">17%
	                </p>
	              </div>

	              <div class="poll-results-bar">
	                <div class="poll-bar" style="width:17%;"></div>
	              </div>

	              <div class="poll-votes-number" data-votes="1">
	                <p>
										<span class="votes" id="inline-vote-8f689e78-ba6c-11eb-8dc9-020055">1</span>
	                  Votes
	                </p>
									<span class="count" style="display:none">2</span>
									<span class="order" style="display:none">1</span>
	              </div>

	            </div>

	          
	            <div class="poll-item blue mix" data-id="8f68afe2-ba6c-11eb-8dc9-020055" data-order="0" style="position: absolute; left: 0px; top: 516px;">

								
	              <div class="poll-results-heading">
	                <h2 class="name">Coaching Agile Teams</h2>
	                <p class="percent">0%
	                </p>
	              </div>

	              <div class="poll-results-bar">
	                <div class="poll-bar" style="width:0%;"></div>
	              </div>

	              <div class="poll-votes-number" data-votes="0">
	                <p>
										<span class="votes" id="inline-vote-8f68afe2-ba6c-11eb-8dc9-020055">0</span>
	                  Votes
	                </p>
									<span class="count" style="display:none">4</span>
									<span class="order" style="display:none">0</span>
	              </div>

	            </div>

	          
	          </div>

	        </div>

																				
		        <div class="poll-right-column">
		          <div class="poll-right-column-stick" style="">

																																	<div class="poll-submit-button">
													<a href="https://fast-poll.com/poll/8f600a24" title="Submit your vote">Submit your vote</a>
												</div>
																					
		              
		            
		            <div class="poll-right-column-inner">

		              <div class="poll-votes-count">
		                <p class="votes-title">Votes</p>
										<p class="votes-number" id="votes-number-count">6</p>
		              </div>

												              <div class="poll-share">
			                <p class="share-title">Share</p>

			                <ul>
			                  <li>
													<a href="https://twitter.com/intent/tweet/?text=Vote for June Book! 📢💡%20Vote%20now%20at%20&amp;url=https://fast-poll.com/poll/results/8f600a24" target="_blank" class="share-link twitter" title="Share on Twitter">Share on Twitter</a>
			                  </li>

			                  <li>
													<a href="https://www.facebook.com/sharer/sharer.php?u=https://fast-poll.com/poll/results/8f600a24" target="_blank" class="share-link facebook" title="Share on Facebook">Share on Facebook</a>
			                  </li>

												<li>
													<a href="https://api.whatsapp.com/send?text=Vote for June Book! 📢💡%20-%20Vote%20now%20at%20https://fast-poll.com/poll/results/8f600a24" target="_blank" class="share-link whatsapp" title="Share on WhatsApp">Share on WhatsApp</a>
			                  </li>

			                  <li>
			                    <a href="#" data-reveal-id="copy-url-modal" class="share-link link" title="Share Link">Share Link</a>
			                  </li>
												<li>
													<a href="#" class="share-link qr-code" data-reveal-id="qr-code-modal" title="Share QR Code">Share QR Code</a>
												</li>

			                </ul>
											<div class="mobile-url-copied">
												Link copied
											</div>
			              </div>
									
											            </div>

																	<div class="report-button">
										<a href="#" data-reveal-id="report" title="Report abuse">Report abuse</a>
									</div>
								
		          </div>
		        </div>
					</div>
	      </div>

			
        )
    }
}

export default PollPageTest; 