---
title: 'When LLMs Hallucinate Your Metadata: Reclaiming Control Over Google’s AI Snippets'
description: 'In software development, the goalposts constantly move. Every new framework, spec, or API brings the anxiety of having to be the all-knowing expert. This article unpacks the universal Imposter Tax of the profession and offers four actionable strategies—shifting your value from knowledge storage to knowledge translation.'
draft: true
layout: BlogPost
pubDate: '2025-10-26'
growth: seedling
tags:
  - seo
  - ai
---

When LLMs Hallucinate Your Metadata: Reclaiming Control Over Google's AI Snippets
Growth stage: Seedling → Growing
Target word count: ~1,400 words
Category: Technical / SEO
At some point in the last year, searching for one of my own posts started feeling slightly uncanny. The title looked right. The URL was mine. But the description underneath it — the thing Google was presenting to anyone deciding whether to click — wasn't text I'd written. It was a summary. A confident, fluent, plausible-sounding summary of a page I made, authored entirely by a machine that had never asked my permission and didn't entirely understand what I was trying to say.
It hadn't got it badly wrong. That's almost the more unsettling part. It had got it plausibly wrong — the kind of wrong that a reader would never question, because it sounds like exactly what you'd expect the page to say. One post about CSS scoping had been characterised as a general introduction to BEM. Another had been summarised with a confidence about browser support that I'd specifically written caveats around.
This is the new baseline. Google's AI Overviews — and now AI Mode, its more conversational sibling — don't just pull your meta description anymore. They interpret your page. They synthesise it. And if your content is even slightly ambiguous, they'll resolve that ambiguity in whatever direction they find most useful to the searcher, not necessarily the direction you intended.
The good news is there are tools to push back. They're already in the spec. Most developers just haven't had a reason to reach for them until now.
What's actually happening
For years, Google's snippet was mostly predictable. It would pull from your <meta name="description"> tag if it existed, or fall back to the first readable chunk of your page content if it didn't. Occasionally it would grab a passage that best matched the search query. Either way, the text came from your page, more or less verbatim.
That contract has quietly changed. Google's AI features — AI Overviews, AI Mode, and increasingly standard search snippets too — now use Gemini-based models to generate descriptions rather than extract them. The model reads your page, decides what it's about, and writes a summary optimised for the searcher's presumed intent. Your meta description becomes one input signal among many, not a binding instruction.
Google itself positions this as a feature: AI considers multiple signals — meta description, on-page content, structured data, headings, and semantic relevancy — to produce a coherent summary. From a user experience standpoint, that's often genuinely useful. From a developer's standpoint, it means the words appearing under your site's name in search results are no longer entirely yours to write.
The failure modes are subtle but real. A technical post framed as a "this is how I approached a problem" exploration can be summarised as "a guide to [thing]", stripping the caveats and the learning-in-public context that made it worth reading. A post about an experimental CSS feature — one you explicitly noted was behind a flag — can appear in search as though it's production-ready advice. The AI isn't lying. It's compressing. And compression loses nuance.
The developer's toolkit
The good news: these controls exist at the HTML level, and they're not complicated. Google updated its robots meta tag documentation in 2025 to explicitly confirm that these directives now apply to AI Overviews and AI Mode, not just traditional search snippets.
The nosnippet and max-snippet directives now apply to all forms of Google search results, including web search, Images, Discover, AI Overviews, and AI Mode. That's a meaningful expansion. Let's go through each tool in order of precision.
max-snippet — the constraint
<meta name="robots" content="max-snippet:150">
This tells Google it can generate a snippet, but it must stay under the character limit you specify. It's the lightest touch: you're not blocking interpretation, you're putting a fence around how much of your page can be fed into it.
The practical effect is that the model has less material to work with, which tends to produce shorter, less confident summaries — and less room to stray from your actual content. If your post has a clear first paragraph that accurately represents the whole, a tight max-snippet value pushes the AI toward using it rather than synthesising from deeper in the page.
This is the directive I'd reach for first on most content: it limits exposure without eliminating search visibility.
data-nosnippet — the scalpel
<p>
  This part can be used in a snippet.
  <span data-nosnippet>This part cannot.</span>
</p>
data-nosnippet is an HTML attribute — not a meta tag — applied directly to span, div, or section elements. It tells Google: this specific content is off-limits for snippet generation. Everything else on the page is still fair game.
This is the precision tool. It's particularly useful for:
Disclaimers and caveats that, taken out of context, would misrepresent the post (e.g. "this feature is experimental and flag-only" — something you want readers to see, but don't want the AI summarising away)
Date-sensitive information that may appear outdated in a snippet even though the surrounding content is still accurate
Personal context — first-person framing that the AI tends to drop or flatten into third-person authority statements
One thing worth knowing: structured data remains usable even inside data-nosnippet elements — the attribute only excludes content from text snippets, not from rich results driven by schema markup. So you can protect prose without losing recipe cards or FAQ structured data.
nosnippet — the circuit breaker
<meta name="robots" content="nosnippet">
This is the nuclear option, and it's worth being clear about what it costs. nosnippet doesn't just block AI interpretation — it removes meta descriptions and rich snippets entirely, preventing Google from showing any text or video snippet for the page across all search features.
The result in search is a result with no description text at all — just your title and URL. That's a meaningful hit to click-through rate, because searchers rely on that description to decide whether to click.
Use this for:
Pages where the trade-off is worth it — typically high-value proprietary content, or pages where any AI summarisation creates a real accuracy or brand integrity risk
Pages that already have low organic visibility and where you'd rather have no snippet than a misleading one
Don't use it as a first resort. Most content doesn't warrant the visibility cost.
The awkward trade-off nobody talks about
Here's the part the toolkit documentation doesn't fully address: there is currently no way to opt out of AI Overviews while maintaining normal search presence. Google offers no mechanism to prevent your content from appearing in AI Overviews while keeping your standard snippets and descriptions intact — publishers are forced into difficult trade-off decisions.
nosnippet blocks everything. max-snippet and data-nosnippet constrain the inputs but don't prevent AI generation altogether. If you want to appear in search results with your own description, the honest answer is that you can influence the output but not fully control it.
What you can do is make the AI's job harder by writing with more precision. Counterintuitively, writing clearly and specifically tends to produce more accurate AI summaries — the model has less ambiguity to resolve. Posts with a strong first paragraph that accurately summarises the whole, with the most important caveats front-loaded rather than buried, tend to survive summarisation better.
That's not a complete solution. It's just worth knowing that some of the defence is in the writing itself.
Treating your content as an API
There's a framing shift that's helped me think about this more clearly. Your site's content isn't just text that humans read — it's data that machines consume and re-serve. The accuracy of what those machines say about your site is a form of quality control that previously didn't exist, because snippets came from your page verbatim.
That's changed. The AI is now making claims about your work, to your potential readers, under your URL. The directives above are your mechanism for asserting some control over those claims — not unlimited control, but enough to protect the places where accuracy matters most.
A useful audit practice: search for your most important posts in an incognito window. Read the snippet cold, as a first-time visitor would. If the description is wrong, or flattened, or missing a caveat that changes how someone would understand the post — now you have the tools to push back.
Implementation checklist
Audit your highest-traffic pages first. Search for them in incognito and read the AI-generated descriptions critically.
Use max-snippet as your default constraint on content where you want search visibility but tighter control over summarisation.
Use data-nosnippet on specific elements that are likely to be misrepresented — experimental flags, date-sensitive sections, or heavy caveats.
Use nosnippet only where the accuracy or brand risk of any AI representation outweighs the value of the description entirely.
Front-load your caveats. The strongest paragraphs in terms of AI summarisation are the first one or two — write the most important nuance there, not in a footnote.
Check structured data separately. Schema markup behaves independently of snippet directives. If you have rich results you want to protect, that's a separate audit.
The robots meta tag documentation is maintained by Google's Search Central team and was last updated December 2025. Directive behaviour, particularly around AI Mode, continues to evolve — worth re-checking the official docs before making site-wide changes.
