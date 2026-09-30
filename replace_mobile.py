import re
with open('proyek_belum_tersedia.html', 'r', encoding='utf-8') as f:
    c = f.read()

old_block = r'''        @media \(max-width: 576px\) \{
            \.glass-card \{
                padding: 1\.75rem 1\.25rem;
                border-radius: 1\.5rem;
                max-height: calc\(100dvh - 6rem\);
                margin: 1\.5rem 0;
                overflow-y: auto;
                scrollbar-width: none;
            \}
            \.glass-card::-webkit-scrollbar \{
                display: none;
            \}
            \.icon-stage \{
                width: 90px;
                height: 90px;
                margin-bottom: 1rem;
            \}
            \.concept-badge \{
                margin-bottom: 0\.85rem;
                padding: 0\.3rem 0\.8rem;
                font-size: 0\.75rem;
            \}
            h1\.project-title \{
                font-size: 1\.4rem;
                margin-bottom: 0\.75rem;
            \}
            \.project-description \{
                font-size: 0\.9rem;
                margin-bottom: 1\.25rem;
            \}
            \.roadmap-container \{
                padding: 1rem;
                margin-bottom: 1\.5rem;
            \}
            \.btn-group-custom \{
                flex-direction: column;
                width: 100%;
                gap: 0\.6rem;
            \}
            \.btn-primary-glow, \.btn-secondary-ghost \{
                width: 100%;
                justify-content: center;
                padding: 0\.65rem 1rem;
                font-size: 0\.9rem;
            \}
        \}'''

new_block = '''        @media (max-width: 576px) {
            .glass-card {
                padding: 1.25rem 1rem;
                border-radius: 1.5rem;
                max-height: calc(100dvh - 6rem);
                margin: 1.5rem 0;
                overflow: hidden;
            }
            .icon-stage {
                width: 70px;
                height: 70px;
                margin-bottom: 0.75rem;
            }
            .concept-badge {
                margin-bottom: 0.75rem;
                padding: 0.25rem 0.75rem;
                font-size: 0.7rem;
            }
            h1.project-title {
                font-size: 1.25rem;
                margin-bottom: 0.5rem;
            }
            .project-description {
                font-size: 0.825rem;
                margin-bottom: 1rem;
            }
            .roadmap-container {
                padding: 0.75rem 1rem;
                margin-bottom: 1.25rem;
            }
            .btn-group-custom {
                flex-direction: column;
                width: 100%;
                gap: 0.5rem;
            }
            .btn-primary-glow, .btn-secondary-ghost {
                width: 100%;
                justify-content: center;
                padding: 0.6rem 1rem;
                font-size: 0.85rem;
            }
        }'''

c = re.sub(old_block, new_block, c)

with open('proyek_belum_tersedia.html', 'w', encoding='utf-8') as f:
    f.write(c)
