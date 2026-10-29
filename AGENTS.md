<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep travel offer data and WhatsApp quotation validation in `src/lib/travel.ts` so prices and message generation share one source of truth.
- Keep the quotation form in its own client component; it hands validated data to WhatsApp without storing identity documents or claiming delivery.
- Use semantic theme tokens in `src/styles.css` for all travel-page colors, overlays and shadows.
